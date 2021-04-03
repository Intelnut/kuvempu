import React, { useState, useEffect } from 'react';

import { useResource } from '../../context/Resource';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Link } from 'react-router-dom';

import { pickBy } from 'lodash';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const Component = (props) => {

    const classes = useStyles();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState(null);

    const { schema, model, resource, remove } = useResource();

    useEffect(() => {

        const setupTableProps = () => {

            // get columns to render
            let allowed = pickBy(schema.properties, (value, key) => value.listview);
            let columns = Object.keys(allowed).map((key, i) => {
                let column = {};
                let value = allowed[key];
                column.field = key;
                column.headerName = value.title;
                return column;
            })
            columns.push({ field: 'id', headerName: 'ID' });

            // get rows to render
            let rows = model.map((value) => {
                let row = {};
                row.id = value.id;
                Object.keys(allowed).forEach((key, i) => {
                    row[key] = value[key];
                });
                return row;
            })

            setColumns(columns);
            setRows(rows);

            setLoading(false);
        }

        schema && Array.isArray(model) && setupTableProps();

        return () => {
            setLoading(true);
            setColumns([]);
            setRows([]);
        }
    }, [schema, model]);

    const handleRowClick = (e) => {
        setError(null);
        setSelected(e.id);
    }

    const removeRow = (id) => {
        const newRows = rows.filter(row => (row.id !== id));
        setRows(newRows);
        setSelected(null);
    }

    const handleDelete = async () => {
        setError(null);
        let response = await remove(selected);
        response.success && removeRow(selected);
        response.error && setError(response.error);
    }

    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    component={Link}
                    to={`/manage/${resource.type}/new`}
                    disableElevation
                >
                    New
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    disableElevation
                    component={Link}
                    to={`/manage/${resource.type}/${selected}`}
                    disabled={!!!selected}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    disableElevation
                    onClick={handleDelete}
                    disabled={!!!selected}
                >
                    Delete
                </Button>
            </div>
            <div>
                {error && <Alert variant='filled' severity='error'>{error}</Alert>}
            </div>
            <div style={{ height: 600 }}>
                <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    onRowClick={handleRowClick}
                />
            </div>
        </div >
    )
};

export default Component;
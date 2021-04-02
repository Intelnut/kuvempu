import React, { useState, useEffect } from 'react';

import { useResource } from '../../context/Resource';

import { DataGrid } from '@material-ui/data-grid';

import { pickBy, values } from 'lodash';

const Component = (props) => {

    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const { schema, model, resource } = useResource();

    useEffect(() => {

        const setupTableProps = () => {

            // get columns to render
            let allowed = pickBy(schema.properties, (value, key) => value.listView);
            let columns = Object.keys(_columns).map((key, i) => {
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

        schema && model && setupTableProps();

        return () => {
            setLoading(true);
            setColumns([]);
            setRows([]);
        }
    }, [schema, model]);

    return (
        <div style={{ height: 600 }}>
            <DataGrid loading={loading} rows={rows} columns={columns} pageSize={20} />
        </div>
    )
};

export default Component;
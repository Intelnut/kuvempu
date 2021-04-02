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
        <div>
            <DataGrid loading={loading} rows={rows} columns={columns} pageSize={20} />
        </div>
    )
};

export default Component;
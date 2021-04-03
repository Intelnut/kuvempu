import React, { useState, useEffect } from 'react';

import { useResource } from '../../context/Resource';

import Alert from '@material-ui/lab/Alert';

import { AutoForm } from "uniforms-material";
import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true });

const createValidator = (schema) => {
    const validator = ajv.compile(schema);

    return (model) => {
        validator(model);
        return validator.errors?.length ? { details: validator.errors } : null;
    };
}

const Component = (props) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [schemaBridge, setSchemaBridge] = useState(null);
    const { schema, model, save } = useResource();

    useEffect(() => {

        const setupFormProps = () => {
            const schemaValidator = createValidator(schema);
            const bridge = new JSONSchemaBridge(schema, schemaValidator);
            setSchemaBridge(bridge);
            setLoading(false);
        }

        schema && model && setupFormProps();

        return () => {
            setSchemaBridge(null);
            setLoading(true);
        }
    }, [schema, model]);

    const handleSubmit = async (input) => {
        setError(null);
        setSuccess(null);
        let response = await save(input);
        setError(response.error);
        setSuccess(response.success && 'Success');
    }

    return (
        <div>
            {error && <Alert variant='filled' severity='error'>{error}</Alert>}
            {success && <Alert variant='filled' severity='success'>{success}</Alert>}
            {!loading && <AutoForm
                schema={schemaBridge}
                model={model}
                onSubmit={input => handleSubmit(input)}
            />}
        </div>
    )
};

export default Component;
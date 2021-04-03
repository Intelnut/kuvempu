import React, { useState, useEffect } from 'react';

import { useResource } from '../../context/Resource';

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
    const [loading, setLoading] = useState(true);
    const [schemaBridge, setSchemaBridge] = useState(null);
    const [formData, setFormData] = useState({});
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
        let response = await save(input);
        // TODO: Handle success/error
    }

    return (
        <div>
            {!loading && <AutoForm
                schema={schemaBridge}
                model={formData}
                onSubmit={input => handleSubmit(input)}
            />}
        </div>
    )
};

export default Component;
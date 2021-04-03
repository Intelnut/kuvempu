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
    const { schema, model, resource } = useResource();

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

    return (
        <div>
            {!loading && <AutoForm
                schema={schemaBridge}
                model={formData}
                onSubmit={input => console.log(JSON.stringify(input, null, 2))}
            />}
        </div>
    )
};

export default Component;
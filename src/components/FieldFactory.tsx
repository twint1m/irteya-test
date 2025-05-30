// src/components/FieldFactory.tsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputNumber, Select, Checkbox, Card } from "antd";
import {
    ZodObject,
    ZodArray,
    ZodEnum,
    ZodString,
    ZodNumber,
    ZodBoolean,
    ZodOptional,
    type ZodTypeAny
} from "zod";
import ArrayField from "./ArrayField";

interface FieldFactoryProps {
    schema: ZodTypeAny;
    baseName: string;
}

const FieldFactory: React.FC<FieldFactoryProps> = ({ schema, baseName }) => {
    const { control } = useFormContext();

    if (!(schema instanceof ZodObject)) return null;

    const fields = schema.shape;

    return (
        <div className="space-y-4">
            {Object.entries(fields).map(([key, field]) => {
                const name = baseName ? `${baseName}.${key}` : key;

                if (field instanceof ZodOptional) {
                    field = field._def.innerType;
                }

                if (field instanceof ZodString) {
                    const placeholder = field.description || key;
                    return (
                        <Controller
                            key={name}
                            name={name}
                            control={control}
                            render={({ field }) => <Input {...field} placeholder={placeholder} />}
                        />
                    );
                }

                if (field instanceof ZodNumber) {
                    return (
                        <Controller
                            key={name}
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <InputNumber {...field} placeholder={key} className="w-full" />
                            )}
                        />
                    );
                }

                if (field instanceof ZodBoolean) {
                    return (
                        <Controller
                            key={name}
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                >
                                    {key}
                                </Checkbox>
                            )}
                        />
                    );
                }

                if (field instanceof ZodEnum) {
                    const options = field._def.values;
                    return (
                        <Controller
                            key={name}
                            name={name}
                            control={control}
                            render={({ field: controllerField }) => (
                                <Select {...controllerField} className="w-full" placeholder={'Выберите пол'}>
                                    {options.map((opt: string) => (
                                        <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                    );
                }

                if (field instanceof ZodObject) {
                    return (
                        <Card key={name} title={key} className="bg-gray-50 border">
                            <FieldFactory schema={field} baseName={name} />
                        </Card>
                    );
                }

                if (field instanceof ZodArray) {
                    const itemField = field._def.type;
                    return (
                        <Card key={name} title={key} className="bg-gray-50 border">
                            <ArrayField name={name} itemSchema={itemField} />
                        </Card>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default FieldFactory;

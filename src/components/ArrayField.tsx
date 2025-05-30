import React from "react";
import { Button, Card, Input } from "antd";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { ZodString } from "zod";
import FieldFactory from "./FieldFactory";

interface ArrayFieldProps {
    name: string;
    itemSchema: any;
}

const ArrayField: React.FC<ArrayFieldProps> = ({ name, itemSchema }) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <Card
                    key={field.id}
                    title={`${name} [${index + 1}]`}
                    extra={<Button danger onClick={() => remove(index)}>Удалить</Button>}
                >
                    {itemSchema instanceof ZodString ? (
                        <Controller
                            name={`${name}.${index}`}
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder={name} />
                            )}
                        />
                    ) : (
                        <FieldFactory schema={itemSchema} baseName={`${name}.${index}`} />
                    )}
                </Card>
            ))}
            <Button type="dashed" onClick={() => append(itemSchema instanceof ZodString ? "" : {})}>
                Добавить элемент
            </Button>
        </div>
    );
};

export default ArrayField;

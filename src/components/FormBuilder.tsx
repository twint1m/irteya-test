import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card } from "antd";
import { formSchema } from "../schemas/formSchema";
import { z } from "zod";
import FieldFactory from "./FieldFactory";

const FormBuilder: React.FC = () => {
    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            phones: [""],
            parents: []
        }
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        console.log("Отправленные данные:", data);
    };

    return (
        <FormProvider {...methods}>
            <div className="flex justify-center py-6 px-4">
                <div className="w-full max-w-[1024px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Card title="Форма" className="shadow-md">
                            <div className="space-y-4">
                                <FieldFactory schema={formSchema} baseName="" />
                            </div>
                            <div className="mt-6 text-right">
                                <Button htmlType="submit" type="primary">
                                    Отправить
                                </Button>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};

export default FormBuilder;

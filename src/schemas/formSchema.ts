import z from "zod";

export const formSchema = z.object({
    streetAddress: z.string().min(1, "Обязательное поле").describe("Улица"),
    city: z.string().min(1, "Обязательное поле").describe("Город"),
    state: z.string().min(1, "Обязательное поле").describe("Штат"),
    gender: z.enum(["муж", "жен", "другое"]).describe("Пол"),
    phones: z.array(z.string().min(1).max(255)).min(1).max(3).describe("Телефоны"),
    parents: z
        .array(
            z.object({
                relation: z.enum(["мать", "отец"]).describe("Родство"),
                age: z.number().int().describe("Возраст"),
                name: z.string().describe("Имя"),
                secondName: z.string().describe("Фамилия"),
                grandFather: z
                    .object({
                        name: z.string().describe("Имя"),
                        age: z.number().int().describe("Возраст"),
                        secondName: z.string().describe("Фамилия"),
                        retired: z.boolean().describe("На пенсии"),
                    })
                    .describe("Дедушка"),
                grandMother: z
                    .object({
                        name: z.string().describe("Имя"),
                        age: z.number().int().describe("Возраст"),
                        secondName: z.string().describe("Фамилия"),
                        retired: z.boolean().describe("На пенсии"),
                    })
                    .describe("Бабушка"),
            })
        )
        .min(0)
        .max(2)
        .optional()
        .describe("Родители"),
});

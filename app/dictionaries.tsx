/*
import 'server-only';


const dictionaries = {
    enus: () => import("./dictionaries/en-us.json").then(module => module.default),
    areg: () => import("./dictionaries/ar-eg.json").then(module => module.default)
}


export const getDictionaries = async (localeLang: string, localeCountry: string) => dictionaries[`${localeLang}${localeCountry}` as keyof typeof dictionaries]();
*/
import { LocatorContext } from '../types/page-factory/component'

export const locatorTemplateFormat = (locator: string, { ...context }: LocatorContext): string => {
    let template = locator

    Object.entries(context).forEach(([key, value]) => {
        template = template.replace(`{${ key }}`, value.toString())
    })

    return template
}
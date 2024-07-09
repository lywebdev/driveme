export function combineClassNames(insideClasses, propsClassnames) {
    const insideClassesString = Array.isArray(insideClasses) ? insideClasses.join(' ') : insideClasses;
    return [insideClassesString, propsClassnames].filter(Boolean).join(' ');
}


export function expandVariants(classes, variants) {
    return variants?.map(variant => classes[variant]) ?? [];
}
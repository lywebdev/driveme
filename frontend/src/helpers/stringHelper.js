export function combineClassNames(insideClasses, propsClassnames) {
    const insideClassesString = Array.isArray(insideClasses) ? insideClasses.join(' ') : insideClasses;
    const propsClassesString = Array.isArray(propsClassnames) ? propsClassnames.join(' ') : propsClassnames;
    return [insideClassesString, propsClassesString].filter(Boolean).join(' ');
}


export function expandVariants(classes, variants) {
    return variants?.map(variant => classes[variant]) ?? [];
}

export function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

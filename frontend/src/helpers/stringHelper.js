export function combineClassNames(insideClasses, propsClassnames) {
    const insideClassesString = Array.isArray(insideClasses)
        ? insideClasses.filter(cls => cls != null && typeof cls === 'string' && cls).join(' ')
        : (typeof insideClasses === 'string' ? insideClasses : '');

    const propsClassesString = Array.isArray(propsClassnames)
        ? propsClassnames.filter(cls => cls != null && typeof cls === 'string' && cls).join(' ')
        : (typeof propsClassnames === 'string' ? propsClassnames : '');

    return [insideClassesString, propsClassesString].filter(Boolean).join(' ');
}


export function expandVariants(classes, variants) {
    return variants?.map(variant => classes[variant]) ?? [];
}

export function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

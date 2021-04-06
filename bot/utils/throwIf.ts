export const throwIfNo = (envVariable?: string) => {
    const variableName = Object.keys({ envVariable })[0];

    if (envVariable === undefined) {
        throw new Error(`${variableName} must be provided!`);
    }
}
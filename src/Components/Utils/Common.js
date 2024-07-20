export const getPaginatedData = (data, offset, limit) => {
    if(limit < 0) return data.slice(offset);
    return data.slice(offset, offset + limit);
}
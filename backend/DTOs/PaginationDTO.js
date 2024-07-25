class PaginationDTO {
    page;
    perPage;
    totalItems;
    totalPages;


    constructor({page, perPage, totalItems, totalPages}) {
        this.page = page;
        this.perPage = perPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
    }
}

export default PaginationDTO;
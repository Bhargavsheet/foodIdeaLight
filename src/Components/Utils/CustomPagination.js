import Pagination from 'react-bootstrap/Pagination';

function CustomPagination({totalDataLength, currentPage, itemPerPage, paginationClicked}){
  let active = currentPage;
  let items = [];
  let totalPage = Math.ceil(totalDataLength/itemPerPage);

  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number == active} onClick={(event) => paginationClicked(event)}>
        {number}
      </Pagination.Item>,
    );
  }

    return(
        <div>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default CustomPagination;


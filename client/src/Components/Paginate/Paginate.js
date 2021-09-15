import style from './Paginate.module.css'

function Paginate ({ itemsPerPage, allItems, pagin }) {
  const pageNumbers = []

  for (let i = 0; i < Math.ceil(allItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {
          pageNumbers?.map((number) => (
            <li className={style.number} key={number}>
              <a
                href='#0'
                className={style.numberA}
                onClick={() =>
                  pagin(number * 9)}
              >
                {number + 1}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Paginate

import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { GloablFilter } from './GloablFilter';
import { useMemo } from 'react';
import useServices from '../hooks/useServices';
import useSucursal from '../hooks/useSucursal';

export const TableService = () => {
  const COLUMNS = [
    {
        Header: 'Nombre',
        Footer: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Descripcion',
        Footer: 'Descripcion',
        accessor: 'description',
    },
    {
        Header: 'Precio',
        Footer: 'Precio',
        accessor: 'price',
    },
    {
        Header: 'Sucursal',
        Footer: 'Sucursal',
        accessor: 'sucursal',
    },

    {
        Header: 'Opciones',
        Footer: 'Opciones',
        accessor: '_id',
    },
    
]

const { sucursales } = useSucursal();
const { services, deleteService, getOneService, addToCart } = useServices();
const columns = useMemo(() => COLUMNS, []);



const tableInstance = useTable({
    columns,
    data: services,
}, useGlobalFilter, useSortBy, usePagination);

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    //Filter elements
    state,
    setGlobalFilter,
    rows,
    prepareRow,
    //Pagination
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
} = tableInstance;

const { globalFilter, pageIndex } = state;
const msg="Buscar Servicio";

return (
    <>
        <div className='m-7 items-center justify-center'>
            <div className='flex flex-col  md:flex-row items-center md:ml-32 md:mr-32 mb-0 md:mb-3 md:mt-0 mt-3'>
                <GloablFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder={msg} />
            </div>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg mx-0 md:mx-10 items-center">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 "
                    {...getTableProps()}
                >
                    <thead className=" text-sm text-white uppercase bg-gray-800 border-gray-200 hover:bg-gray-700 ">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th scope="col" className="px-6 py-3" {...column.getHeaderProps(column.getSortByToggleProps)}>
                                        {column.render('Header')}
                                        <span className=' font-bold text-lg'>{column.isSorted ? (column.isSortedDesc ? '-' : '+') : ''}</span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr className="bg-gray-800 border-gray-200 hover:bg-gray-700 " {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        if (cell.column.Header === 'Sucursal') {
                    
                                            return (
                                                <td key={cell.value} className=" text-white">
                                                    {sucursales.find(sucursal => sucursal._id === cell.value).name} 
                                                </td>
                                            )
                                        }
                                        if (cell.column.Header === 'Opciones') {
                                            return (
                                                <td key={cell.value} className = "text-center">
                                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer" onClick={() => getOneService(cell.value)}>Editar</a><br />
                                                    <a className="font-medium text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer" onClick={() => deleteService(cell.value)}>Eliminar</a><br />
                                                    <a className="font-medium text-green-600 dark:text-green-500 hover:underline hover:cursor-pointer" onClick={() => addToCart(cell.value)}>Vender</a>
                                                </td>
                                            )
                                        }
                                        return (
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" {...cell.getCellProps()}>
                                                {cell.column.id == "consult_date" ? dateFormat(cell.value) : cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}

                    </tbody>
                    {/*<tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700" {...column.getFooterProps()}>
                                    {column.render('Footer')} 
                                </td>
                            ))}
                        </tr>
                    ))}
                </tfoot>*/}
                </table>
                {/*Pagination*/}
                <div className="flex flex-row justify-between">
                    <div className='mt-5 ml-4'>
                        <span>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>

                    </div>
                    <div className=' inline-flex'>
                        <button className=" bg-white text-base text-salte-700 m-3 p-2 text-center hover:bg-gray-400"
                            onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'Anterior'}
                        </button>
                        <button className=" bg-slate-800 text-base text-white m-3 p-2  text-center hover:bg-slate-600"
                            onClick={() => nextPage()} disabled={!canNextPage}>
                            {'Siguiente'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
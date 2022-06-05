import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { GloablFilter } from './GloablFilter';
import { useMemo } from 'react';

import useSells from '../hooks/useSells';
import useClients from '../hooks/useClients';
import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export const TableSell = () => {

    const COLUMNS = [
        {
            Header: 'Usuario',
            Footer: 'Usuario',
            accessor: 'user',
        },
        {
            Header: 'Cliente',
            Footer: 'Cliente',
            accessor: 'client',
        },
        {
            Header: 'Sucursal',
            Footer: 'Sucursal',
            accessor: 'sucursal',
        },
        {
            Header: 'Cantidad',
            Footer: 'Cantidad',
            accessor: 'cant',
        },
        {
            Header: 'Total',
            Footer: 'total',
            accessor: 'total',
        },
        {
            Header: 'Fecha',
            Footer: 'fecha',
            accessor: 'createdAt',
        },

        {
            Header: 'Opciones',
            Footer: 'Opciones',
            accessor: '_id',
        },

    ]

    const { sells, setSell, createTempCart, deleteSell, getOneSell } = useSells();
    const { updateStockSelled } = useProducts();
    const {addToTempCart} = useClients();
    const navigate = useNavigate();

    let TotalSells = 0;

    const handleDelete = async (id) => {
        const swalResponse = await swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podras recuperar este registro",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        });
        if (swalResponse) {
            const sell = await getOneSell(id);
            sell.products.forEach(product => {
                updateStockSelled(product._id, product.cantToSell * -1);
            });
            deleteSell(id);
        }
    }

    const handleDetail = async (id) => {
        const data = await getOneSell(id);
        addToTempCart(data.client);
        setSell(data);
        navigate(`/admin/detailSell`);
    }

    const columns = useMemo(() => COLUMNS, []);

    const tableInstance = useTable({
        columns,
        data: sells,
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
    const msg="Buscar Venta";

    return (
        <>
            <div className=' items-center justify-center'>
                <div className='flex flex-col  md:flex-row items-center md:ml-32 md:mr-32 mb-0 md:mb-3 md:mt-0 mt-3'>
                    <GloablFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder={msg}/>
                </div>
                <div className=" overflow-x-auto shadow-md sm:rounded-lg mx-0 md:mx-10">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 "
                        {...getTableProps()}
                    >
                        <thead className=" text-sm text-white uppercase bg-gray-700  border-gray-200 ">
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
                                    <tr className="bg-gray-800 text-white border-gray-200 hover:bg-gray-700 " {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            if (cell.column.Header === 'Total') {
                                                TotalSells = TotalSells + cell.value;
                                            }

                                            if (cell.column.Header === 'Opciones') {
                                                return (
                                                    <td key={cell.value} className="text-center w-20">
                                                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer" onClick={() => createTempCart(cell.value)}>Editar</a><br />
                                                        <a className="font-medium text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer" onClick={() => handleDelete(cell.value)}>Eliminar</a><br />
                                                        <a className="font-medium text-green-600 dark:text-green-500 hover:underline hover:cursor-pointer" onClick={() => handleDetail(cell.value)}>Detalle</a>
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
                        <div className='hidden sm:block ml-0 md:ml-60'>
                            <p className='mt-5 ml-32'><span className='font-bold text-lg'>Total:</span>{TotalSells} Gs</p>
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
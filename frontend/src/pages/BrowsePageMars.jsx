import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '../components/ScrollToTopButton';

const MAX_PAGES = 35;
const PAGE_GROUP_SIZE = 5;

const BrowsePageMars = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [resultMars, setResultMars] = useState([]);
    const [pageGroupStart, setPageGroupStart] = useState(1);


    useEffect(() => {
        async function getPaginatedMars() {
            setLoading(true);
            try {
                const response = await fetch(`https://nasa-backend-ht26.onrender.com/api/mars/searchMars?page=${page}`);
                const dataMars = await response.json();
                setResultMars(dataMars.photos || []);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load Mars data.');
                setLoading(false);
            }
        }

        getPaginatedMars();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= MAX_PAGES) {
            setPage(newPage);
        }
    };

    const nextPageGroup = () => {
        const newStart = pageGroupStart + PAGE_GROUP_SIZE;
        if (newStart <= MAX_PAGES) {
            setPageGroupStart(newStart);
            setPage(newStart);
        }
    };

    const prevPageGroup = () => {
        const newStart = pageGroupStart - PAGE_GROUP_SIZE;
        if (newStart >= 1) {
            setPageGroupStart(newStart);
            setPage(newStart);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        const end = Math.min(pageGroupStart + PAGE_GROUP_SIZE - 1, MAX_PAGES);
        for (let i = pageGroupStart; i <= end; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded mx-1 font-semibold cursor-pointer ${i === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <>
            <Toaster />
            <h1 className="bg-sky-200 text-center text-4xl py-4 font-bold">Check Mars Photos</h1>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 py-6">
                <button
                    onClick={prevPageGroup}
                    disabled={pageGroupStart === 1}
                    className="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ←
                </button>
                {renderPageButtons()}
                <button
                    onClick={nextPageGroup}
                    disabled={pageGroupStart + PAGE_GROUP_SIZE > MAX_PAGES}
                    className="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    →
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {resultMars.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-300"
                            >
                                <img
                                    src={item.img_src}
                                    alt={`Mars - ${item.earth_date}`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold mb-2">📅 {item.earth_date}</h2>
                                    <p className="text-sm text-gray-600">Rover: {item.rover.name}</p>
                                    <p className="text-sm text-gray-600">Camera: {item.camera.full_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <ScrollToTopButton position="right" />
        </>
    );
};

export default BrowsePageMars;

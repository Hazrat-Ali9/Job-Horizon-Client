import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const AllJob = () => {
    const axiosSecure = useAxiosSecure();
    const {user } = useAuth();
    const [searchText, setSearchText] = useState('');
    const { data: jobs = [], isLoading, refetch } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            if (searchText) {
                console.log(searchText);
                const { data } = await axiosSecure.get(`/jobs?search=${searchText}`)
                return data;
            }
            const { data } = await axiosSecure.get(`/jobs`)
            return data;
        }
    })
    const handleSearch = e => {
        e.preventDefault();
        refetch();
    }

    if (isLoading) {
        return <div className='text-center my-12'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
    return (
        <div>
            <Helmet>
                <title>JobHorizon | All Jobs</title>
            </Helmet>

            <form onSubmit={handleSearch} className='flex justify-center items-center'>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        onChange={e => setSearchText(e.target.value)}
                        value={searchText}
                        type="text" className="grow" placeholder="Search" />
                    <button>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </label>
            </form>


            <div className="overflow-x-auto max-w-5xl mx-auto">
                <table
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                >
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Job Title</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Job Posting Date
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Application Deadline</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Salary range
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                Action
                            </th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            jobs.map(job => (
                                <tr key={job._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                        {job.jobTitle}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(job.jobPostingDate).toLocaleDateString()}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{new Date(job.applicationDeadline).toLocaleDateString()}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">${job.salaryRange}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <Link
                                            onClick={() => user || toast.error('You have to log in first to view details')}
                                            to={`/job/${job._id}`}
                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllJob;
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxiosSecure from '../hooks/useAxiosSecure';
// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import JobCard from './JobCard';
const JobByCategory = () => {

    const axiosSecure = useAxiosSecure();
    // const [searchText, setSearchText] = useState('');
    const { data: jobs = [], isLoading } = useQuery({
        queryKey: ['jobs-Category'],
        queryFn: async () => {
            // if (searchText) {
            //     console.log(searchText);
            //     const { data } = await axiosSecure.get(`/jobs?search=${searchText}`)
            //     return data;
            // }
            const { data } = await axiosSecure.get(`/jobs`)
            return data;
        }
    })
    // console.log(jobs)

    if (isLoading) {
        return <div className='text-center my-12'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <div>
            <div>
                <h2 className='text-3xl font-medium text-center my-10'>Job by Category</h2>
            </div>
            <div >

                <Tabs>
                    <div className='flex justify-center items-center'>
                        <TabList>
                            <Tab>All Jobs</Tab>
                            <Tab>On-Site Job</Tab>
                            <Tab>Remote Job</Tab>
                            <Tab>Hybrid</Tab>
                            <Tab>Part-Time</Tab>
                        </TabList>
                    </div>


                    <TabPanel >
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>
                                ))
                            }
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.jobCategory === 'On-Site Job').map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>
                                ))
                            }
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.jobCategory === 'Remote Job').map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>
                                ))
                            }
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.jobCategory === 'Hybrid').map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>
                                ))
                            }
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.jobCategory === 'Part-Time').map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={job}
                                    ></JobCard>
                                ))
                            }
                        </div>

                    </TabPanel>

                </Tabs>
            </div>
        </div>
    );
};

export default JobByCategory;
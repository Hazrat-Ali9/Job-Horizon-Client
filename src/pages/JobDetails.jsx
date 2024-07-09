import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const JobDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const { id } = useParams()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['job'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/job/${id}`)
            return data;
        }
    })

    if (isLoading) {
        return <div className='text-center my-12'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    const {
        _id,
        jobBannerUrl,
        jobTitle,
        userName,
        userEmail,
        jobCategory,
        salaryRange,
        jobDescription,
        jobPostingDate,
        applicationDeadline,
        jobApplicantsNumber } = data;

    const handleApply = async (e) => {
        e.preventDefault();
        const form = e.target;
        const jobData = {
            jobId: _id,
            jobBannerUrl,
            jobTitle,
            userName,
            userEmail,
            jobCategory,
            salaryRange,
            jobDescription,
            jobPostingDate,
            applicationDeadline,
            jobApplicantsNumber,
            application: {
                applicantUserName: form.applicantUserName.value,
                applicantUserEmail: form.applicantUserEmail.value,
                resumeLink: form.resumeLink.value,
            }
        }


        if (user.email === userEmail) {
            return toast.error("Employer can't apply for his own job")
        }

        const currentDate = new Date();
        const applicationDeadlineValue = new Date(applicationDeadline);
        if (currentDate > applicationDeadlineValue) {
            return toast.error("Deadline is over")
        }


        axiosSecure.post('/apply-job', jobData)
            .then(res => {
                console.log(res.data);
                if (res.data.success === true) {
                    refetch();
                    toast.success("Job applied Successfully")
                    const close = document.getElementById('modal-close')
                    close
                }

            })
            .catch(err => {
                // console.log(err)
                toast.error(err.response.data.message)
            })

    }




    return (
        <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mt-10 mx-auto bg-slate-200 dark:bg-slate-700 rounded-xl">
            <Helmet>
                <title>JobHorizon | Job Details</title>
            </Helmet>

            <div >
                <img
                    className="object-cover max-w-96 rounded-xl border-4 m-4 border-gray-400"
                    src={jobBannerUrl} alt="" />
            </div>

            <div className="flow-root rounded-lg border border-gray-100 py-3 mx-auto shadow-sm dark:border-gray-700">
                <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
                    <div
                        className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800"
                    >
                        <dt className="font-medium text-gray-900 dark:text-white">Job Title</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{jobTitle}</dd>
                    </div>

                    <div
                        className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800"
                    >
                        <dt className="font-medium text-gray-900 dark:text-white">Description</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{jobDescription}</dd>
                    </div>

                    <div
                        className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800"
                    >
                        <dt className="font-medium text-gray-900 dark:text-white">Salary Range</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{salaryRange}</dd>
                    </div>

                    <div
                        className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800"
                    >
                        <dt className="font-medium text-gray-900 dark:text-white">Number of Applicants</dt>
                        <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{jobApplicantsNumber}</dd>
                    </div>



                    <div
                        className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800"
                    >
                        <dt className="font-medium text-gray-900 dark:text-white">Apply Now</dt>

                        <button
                            // onClick={handleApply}
                            onClick={() => document.getElementById('my_modal_2').showModal()}
                            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                        >
                            Apply
                        </button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <section className="bg-white dark:bg-gray-900">
                                    {/* Model Body */}
                                    <div className="">
                                        <main
                                            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                                        >
                                            <div className="max-w-xl lg:max-w-3xl">
                                                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                                    Apply For Job 🦑
                                                </h1>

                                                {/* <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                                    quibusdam aperiam voluptatum.
                                                </p> */}

                                                <form onSubmit={handleApply} className="mt-8 grid grid-cols-6 gap-6">
                                                    <div className="col-span-6">
                                                        <label
                                                            htmlFor="UserName"
                                                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                        >
                                                            Applicant Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="applicantUserName"
                                                            name="applicantUserName"
                                                            value={user.displayName}
                                                            disabled
                                                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                        />
                                                    </div>


                                                    <div className="col-span-6">
                                                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                            Applicant Email
                                                        </label>

                                                        <input
                                                            type="email"
                                                            id="applicantUserEmail"
                                                            name="applicantUserEmail"
                                                            value={user.email}
                                                            disabled
                                                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                            Resume Link
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="resumeLink"
                                                            name="resumeLink"
                                                            required
                                                            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                        />
                                                    </div>



                                                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                                        <button
                                                            onClick={() => {
                                                                document.getElementById('close-btn').click();
                                                            }}
                                                            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </main>
                                    </div>
                                </section>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button id='close-btn'>close</button>
                            </form>
                        </dialog>

                    </div>
                </dl>
            </div >
        </div>
    );
};

export default JobDetails;
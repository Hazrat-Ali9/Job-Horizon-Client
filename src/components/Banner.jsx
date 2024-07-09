import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Banner = () => {
    return (
        <div>
            <section className="bg-gray-900 text-white grid grid-rows-1 lg:grid-cols-2">
                <div>
                    <div className="lg:px-4 lg:py-32 flex justify-center items-center">
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >

                            <img src="./bannerimg.png" alt="" />
                        </motion.div>
                    </div>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 pb-4 lg:py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                        >
                            Discover Your Next Opportunity.

                            <span className="sm:block"> Find the Perfect Job. </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Explore a curated collection of job listings and unlock new career possibilities. Whether you're seeking remote positions, part-time roles, or on-site opportunities, we have the jobs tailored for you.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link to={'/all-job'}
                                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto" 
                            >
                                Find Job
                            </Link>

                            <Link to={'/'}
                                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;
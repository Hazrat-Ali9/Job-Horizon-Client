import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Blogs = () => {

    return (
        <div>
            <Helmet>
                <title>JobHorizon | Blogs</title>
            </Helmet>

            <div className="mx-auto max-w-3xl p-6">
                <h1 className="text-3xl font-bold mb-4">Understanding Access Tokens and Express.js vs. NestJS</h1>

                {/* What is an Access Token and Refresh Token? */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">1. What is an Access Token and Refresh Token?</h2>
                    <p className="mb-4">
                        Access tokens and refresh tokens are used in authentication systems to grant access to resources on behalf of
                        a user. An access token is typically a short-lived token used to access protected resources, while a refresh
                        token is a long-lived token used to obtain new access tokens when they expire.
                    </p>
                    <h4 className="text-xl font-semibold mb-2"><li>How do they work and where should
                        we store them on the client side?</li></h4>
                    <p className="mb-4">
                        Access tokens are sent with each request to authenticate the user, while refresh tokens are securely stored on
                        the client side and used to obtain new access tokens without requiring the user to log in again.
                    </p>

                    <p className="mb-4">
                        Access tokens should be stored in memory (e.g., in browser memory or a secure storage mechanism) for security
                        reasons. Refresh tokens should be stored securely on the client side, such as in an HTTP-only cookie or secure
                        storage, to prevent unauthorized access.
                    </p>
                </section>

                {/* What is Express.js and NestJS? */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">2. What is Express.js and NestJS?</h2>
                    <p className="mb-4">
                        Express.js is a minimalist web framework for Node.js that provides a robust set of features for building web
                        applications and APIs. It is known for its simplicity, flexibility, and performance.
                    </p>
                    <p className="mb-4">
                        NestJS, on the other hand, is a progressive Node.js framework that uses TypeScript and is inspired by
                        Angular's architecture. It provides a structured and scalable way to build server-side applications,
                        incorporating modern design patterns and best practices.
                    </p>
                    <p className="mb-4">
                        NestJS offers features like dependency injection, middleware support, and modular architecture, making it ideal
                        for building complex and maintainable applications.
                    </p>
                </section>

                {/* Explain Your Job-Seeking Website Project */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">3. Explain Your Job-Seeking Website Project</h2>
                    <p className="mb-4">
                        We are developing a user-friendly job-seeking website using React, MongoDB, Node.js, Express.js, Firebase, and JWT Token
                        authentication. The features of our website include:
                    </p>
                    <ul className="list-disc pl-4 mb-4">
                        <li>User can post job listings.</li>
                        <li>Other users can view and apply for job positions.</li>
                        <li>User can edit or delete their posted jobs but not jobs posted by others.</li>
                        <li>User can view the list of jobs they have applied for but cannot see jobs applied by other users.</li>
                    </ul>
                    <p className="mb-4">
                        This project aims to create a seamless and secure platform for job seekers and employers to interact and manage job
                        listings effectively. Firebase is used for real-time database capabilities, enabling dynamic updates and interactions
                        within the platform.
                    </p>
                </section>


                {/* Conclusion and Call to Action */}
                <div className="text-center">
                    <p className="mb-4">
                        Hopefully, this blog post has helped clarify the concepts of access tokens, refresh tokens, Express.js, and
                        NestJS. If you're interested in learning more or trying out these technologies, check out the official
                        documentation for <Link to="https://expressjs.com">Express.js</Link> and{' '}
                        <Link to="https://nestjs.com">NestJS</Link>.
                    </p>
                    <p className="font-bold">Happy coding!</p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
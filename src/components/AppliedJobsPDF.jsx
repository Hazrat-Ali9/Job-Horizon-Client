import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types'; // ES6

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    jobItem: {
        marginBottom: 10,
    },
});

const AppliedJobsPDF = ({ jobs }) => {
    return (
        // <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Applied Jobs Summary</Text>
                {jobs.map((job) => (
                    <View key={job._id} style={styles.jobItem}>
                        <Text>Job Title: {job.jobTitle}</Text>
                        <Text>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</Text>
                        <Text>Job Category: {job.jobCategory}</Text>
                        <Text>Salary Range: ${job.salaryRange}</Text>
                        <Text>Applicant Name: {job.application.applicantUserName}</Text>
                        <Text>Applicant Email: {job.application.applicantUserEmail}</Text>
                        <Text>Resume Link: {job.application.resumeLink}</Text>
                    </View>
                ))}
            </Page>
        </Document>
        // </PDFViewer>
    );
};

export default AppliedJobsPDF;

AppliedJobsPDF.propTypes = {
    jobs: PropTypes.array,
}

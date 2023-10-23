const TeacherModel = require('../model/teacherModel');

const handleFormSubmission = {
    submitForm: async (req, res) => {

        // if (!req.files || !req.files['profile'] || !req.files['resume'] || !req.files['id']) {
        //     return res.status(400).send('Both profile and resume files are required.');
        // }

        try {
            const { fullname, email, phone, level, reference } = req.body;

            // console.log('Fullname:', fullname);
            // console.log('Email:', email);
            // console.log('Phone:', phone);
            // console.log('Level:', level);
            // console.log('Reference:', reference);

            // File paths
            const resumePath = req.files['resume'][0].path;
            const profilePath = req.files['profile'][0].path;
            const idPath = req.files['id'][0].path;

            // console.log('Resume Path:', resumePath);
            // console.log('Profile Picture Path:', profilePath);
            // console.log('ID Path:', idPath);

            // const profile = profilePath.replace(/^uploads\\Uprofile\\/i, "");
            // const resume = resumePath.replace(/^uploads\\Uprofile\\/i, "");
            // const id = idPath.replace(/^uploads\\Uprofile\\/i, "");

            // const profilePath = "uploads\\Uprofile\\profile-1696789931103.jpg";
            // const trimmedPath = profilePath.replace(/^uploads\\Uprofile\\/i, "");
            // console.log(trimmedPath);

            function generateUniqueID() {
                const prefix = "TeacherX";
                const randomSuffix = Math.random().toString(36).substring(2, 8);
                const uniqueID = prefix + randomSuffix;
                return uniqueID;
            }

            // Example usage
            const teacherID = generateUniqueID();
            //   console.log(uniqueID);

            await TeacherModel.create({
                fullname: fullname,
                email: email,
                phone: phone,
                level: level,
                reference: reference,
                resumePath: resumePath,
                profilePath: profilePath,
                idPath: idPath,
                uniqueID: teacherID
            })
            res.redirect(`/success?teacherID=${teacherID}`);
        } catch (error) {
            res.redirect('/error')
        }


        // const formData = {
        //     fullname,
        //     email,
        //     phone,
        //     level,
        //     reference,
        //     resumePath,
        //     profilePath,
        //     idPath,
        //     teacherID
        // };

        // res.status(200).json(formData);
    }
};

module.exports = { handleFormSubmission };

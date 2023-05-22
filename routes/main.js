var express = require("express");
var router = express.Router();

let data = require("../config/data.json");

router.get("/listAll", (req, res, next) => {
    if (!data) {
        res.json({ success: false, result: "No data found" })
    }

    let result = {
        categories: []
    };

    data.categories.forEach((category) => {
        let categoryObject = {
            name: category.name,
            courses: []
        };

        category.courses.forEach((course) => {
            let courseObject = {
                name: course.name,
                modules: []
            };

            course.modules.forEach((mod) => {
                courseObject.modules.push(mod);
            });

            categoryObject.courses.push(courseObject);
        });

        result.categories.push(categoryObject);
    });
    res.json({ success: true, result: result });

});

router.get("/topTen", (req, res, next) => {
    if (!data) {
        res.json({ success: false, result: "No data found" })
    }

    let moduleVisits = [];
    let month = req.query.selectedValue;

    if (!month) {
        res.json({ success: false, result: "No month selected" })
    }
    data.categories.forEach((category) => {
        category.courses.forEach((course) => {
            course.modules.forEach((mod) => {
                const visits = mod.visits.find((visit) => visit.month === month);
                if (visits) {
                    moduleVisits.push({
                        module: mod.name,
                        visits: visits.count,
                        course: course.name,
                        category: category.name
                    });
                }
            });
        });
    });

    moduleVisits.sort((a, b) => b.visits - a.visits);

    res.json({ success: true, topTen: moduleVisits });
});


module.exports = router;

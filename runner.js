const cypress = require("cypress");
const marge = require("mochawesome-report-generator");
const { merge } = require("mochawesome-merge");
const moment = require("moment");

// Get current run timestamp
const currRunTimestamp = getTimeStamp();

// Get cypress CLI options using 'minimist
const args = require("minimist")(process.argv.slice(3));

// Source directory where individual test reports are created
const sourceReport = {
  files: ["./mochawesome-report/*.json"],
};

// Destination directory where we want our unified .html and .json file to be placed
const finalReport = {
  reportDir: "reports/" + "Test Run - " + currRunTimestamp,
  saveJson: true,
  reportFilename: "Run-Report",
  reportTitle: "Run-Report",
  reportPageTitle: "Run-Report",
};

// Cypress Module API
cypress
  .run({
    ...args,
    config: {
      pageLoadTimeout: 10000,
      screenshotsFolder:
        "reports/" + "Test Run - " + currRunTimestamp + "/screenshots",
      video: true,
      videosFolder: "reports/" + "Test Run - " + currRunTimestamp + "/videos",
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir:
        "reports/" + "Test Run - " + currRunTimestamp + "/mochawesome-report",
      overwrite: false,
      html: true,
      json: true,
    },
  })
  .then((result) => {
    // Generate a unified report, once Cypress test run is done
    generateReport()
      .then(() => {
        console.log("All Reports merged");
      })
      .catch((err) => {
        console.error("Getting error while merging reports: ", err.message);
      })
      .finally(() => {
        console.log("Test Run Completed");
        // Process.exit()
      });
  })
  .catch((err) => {
    generateReport();
    console.error(err.message);
    process.exit(1);
  });

// Get current timestamp
function getTimeStamp() {
  return new moment().format("DD-MM-YYYY--HH_mm_ss");
}

// Generate unified report from sourecReport.files directory and create a unified report and store it in finalReport.reportDir location
function generateReport() {
  return merge(sourceReport).then((report) => {
    marge.create(report, finalReport);
  });
}

class MyReporter {
  // onBegin(suite) {
  //   console.log(`Starting the run with ${suite.allTests().length} tests`);
  // }

  onTestBegin(test) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;

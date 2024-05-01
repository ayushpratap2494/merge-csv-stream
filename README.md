[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# merge-csv-stream

> merge-csv-stream is a lightweight Node.js package designed to streamline the process of merging multiple CSV files into a single CSV file. With its intuitive interface and native Node.js code, merge-csv-stream offers a seamless solution for developers looking to efficiently concatenate CSV data.

> Key Features: Efficient Stream Processing: Leveraging the power of Node.js streams, MergeCSV ensures efficient handling of large CSV files, minimizing memory consumption and optimizing performance. No External Dependencies: Built with native Node.js code, MergeCSV eliminates the need for external dependencies, ensuring a lightweight and hassle-free installation process.

Example:

```tsx
const merge_csvs = require('merge-csv-stream');

const inputFiles = ['./path_to_your_file1.csv', './path_to_your_file2.csv'];

let options = {  /*delimiter = ',', wrapper = '"', newlineSeperator = '\r\n', outputPath = 'output.csv'
*/
}

merge_csvs(inputFiles, options);

```

## Built With

* Native Node.js modules 
* No external dependencies.

## Authors

* **Ayush Pratap** - *Initial work* - [AyushPratap](https://github.com/ayushpratap2494)

## License

[MIT License] © Ayush Pratap
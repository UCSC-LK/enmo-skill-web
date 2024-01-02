document.addEventListener('DOMContentLoaded', function () {
    // Get the div element
    var myDiv = document.getElementById('myDiv');

    // Add click event listener to the div
    myDiv.addEventListener('click', function () {
        // Create an input element of type 'file'
        var input = document.createElement('input');
        input.type = 'file';

        // Set up event listener for file input change
        input.addEventListener('change', function (event) {
            // Get the selected file
            var file = event.target.files[0];

            // Check if a file was selected
            if (file) {
                // Create a FileReader to read the selected file
                var reader = new FileReader();

                // Set up event listener for when the FileReader has loaded the file
                reader.addEventListener('load', function () {
                    // Set the background of the div to the loaded image
                    myDiv.style.backgroundImage = 'url(' + reader.result + ')';
                });

                // Read the file as a data URL
                reader.readAsDataURL(file);
            }
        });

        // Trigger a click on the input element to open the file upload window
        input.click();
    });
});

function openFileUploader() {
    // Create an input element of type 'file'
    var input = document.createElement('input');
    input.type = 'file';

    // Set up event listener for file input change
    input.addEventListener('change', function (event) {
        // Get the selected file
        var file = event.target.files[0];

        // Check if a file was selected
        if (file) {
            // Display success message with file name
            document.getElementById('uploadedText').style.display = 'none';
            document.getElementById('uploadMessage').style.display = 'block';
            document.getElementById('uploadErrorMessage').style.display = 'none';
            document.getElementById('fileName').textContent = file.name;
        } else {
            // Display error message if no file selected
            document.getElementById('uploadMessage').style.display = 'none';
            document.getElementById('uploadedText').style.display = 'block';
            document.getElementById('uploadErrorMessage').style.display = 'block';
        }
    });

    // Trigger a click on the input element to open the file upload window
    input.click();
}
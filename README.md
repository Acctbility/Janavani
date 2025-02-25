# Janavani
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload to Twitter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        input[type="file"], textarea {
            margin: 20px 0;
        }
        button {
            padding: 10px 20px;
            background-color: #1DA1F2;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Upload an Image and Text to Twitter</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <textarea name="text" rows="4" cols="50" placeholder="Enter your text here" required></textarea>
        <br>
        <input type="file" name="image" accept="image/*" required>
        <br>
        <button type="submit">Upload and Tweet</button>
    </form>
</body>
</html>

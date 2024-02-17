import React, { useState } from "react";
import {
  Button,
  Typography,
  InputLabel,
  IconButton,
  TextField,
  Grid,
  Container,
  Paper,
  Box,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [toEmail, setEmail] = useState("");
  const [toEmailBody, setMessage] = useState("");
  const MAX_FILE_SIZE_MB = 10;
  const handleFileChange = (event) => {
    const files = event.target.files;
    const updatedSelectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size / (1024 * 1024) <= MAX_FILE_SIZE_MB) {
        updatedSelectedFiles.push(file);
      } else {
        alert(
          `File ${file.name} exceeds the maximum file size of ${MAX_FILE_SIZE_MB} MB.`
        );
      }
    }
    setSelectedFiles([...event.target.files]);
  };

  const handleUpload = () => {
    if (toEmail === "") {
      alert("Please input email.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("FilesData", selectedFiles[i]);
    }

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VyYWNoYW1heCIsIm5hbWVpZCI6IjEiLCJlbWFpbCI6InN1cmFjaGF0aG9uZ21hbmVlQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MDg2MDE1NDAsImlzcyI6InN1cmFjaGEiLCJhdWQiOiJzdXJhY2hhdGhvbmdtYW5lZSJ9.hrSNqSStmcxR29HaaolOnumHYV6FibH-gXSRg80IZqE";

    formData.append("ToEmail", toEmail);
    formData.append("ToEmailBody", toEmailBody);

    fetch("https://localhost:44329/api/FileUpload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Error uploading file failure");
          throw new Error("Failed to upload files");
        }
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          alert(result.message);
          window.location.reload();
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <StyledPaper>
          <Box display="flex" alignItems="center" flexDirection="column">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <InputLabel
              htmlFor="contained-button-file"
              sx={{ fontSize: 20, marginBottom: 2 }}
            >
              Add File
            </InputLabel>
            <label htmlFor="contained-button-file">
              <IconButton
                component="span"
                sx={{ width: "180px", height: "80px" }}
              >
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <CloudUploadIcon />
                  Choose File
                </Button>
              </IconButton>
            </label>
            {selectedFiles.length > 0 && (
              <Typography variant="body1" component="p" sx={{ marginTop: 2 }}>
                {selectedFiles.length === 1
                  ? `Selected file: ${selectedFiles[0].name}`
                  : `Selected files: ${selectedFiles
                      .map((file) => file.name)
                      .join(", ")}`}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                sx={{
                  width: "180px",
                  height: "50px",
                  justifyContent: "flex-start",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </StyledPaper>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputLabel sx={{ textAlign: "right" }}></InputLabel>
            </Grid>
            <Grid item xs={8}>
              <InputLabel sx={{ textAlign: "left" }}>
                {" "}
                ** You can send to multi email by using "," for this example as
                below :<br></br>{" "}
                <div style={{ color: "red" }}>
                  "Example_1_@gmail.com, Example_2_@gmail.com"
                </div>
              </InputLabel>
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ textAlign: "right" }}>To Email:</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={toEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel sx={{ textAlign: "right" }}>Message:</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                fullWidth
                required
                value={toEmailBody}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default FileUpload;

# Upload File Microservice

**The Upload File project is a microservice application developed with C#.NET 8 and React.JS. It boasts the following features:**

* **Security:** Utilizes JWT Token for enhanced security.
* **Scalability:** Supports multi-file uploads and can send multiple emails for improved scalability.
* **Testability:** Includes unit tests in UploadFileServer for robust testability.
* **API Standard (RESTful):** Comprises three distinct parts - Upload Client, Upload Server, and Notification Server, adhering to API standards.

### Setup Instructions
1. Extract the Zip File
2. Download Visual Studio Community 2022:
   - Visit Visual Studio Community 2022 and download the installer(https://visualstudio.microsoft.com/vs/community/).
   - Install Visual Studio Community 2022.
   - In the Workloads section, ensure that .NET Desktop Development is selected.
   - In the Individual Components section, ensure that .NET 8.0 Runtime (Long Term Support) is selected.
   - Proceed with the installation.
3. Download Visual Studio Code (https://code.visualstudio.com/)
4. Clone 3 repo as below
   * upload-file-client
     * Open CMD and navigate to the FileUploadClient directory.
     * Execute `code .` to open Visual Studio Code.
     * Run `npm run dev` to start the development server.
   * upload-file-server
     * open the solution for both projects: FileUploadServer and NotificationServer. Ensure the following packages are installed:
       * IdentityModel.AspNetCore.OAuth2Introspection
       * Microsoft.AspNetCore.Authentication.JwtBearer
       * Microsoft.AspNetCore.Cors
       * Microsoft.AspNetCore.Mvc.NewtonsoftJson
       * Newtonsoft.Json
       * Run the project.
     * To run tests in project UploadFileServer.Test:
       * Right-click on => `UploadServiceTests.cs` in **FileUploadService.Tests**.
       * Select => **Run Tests** to execute the unit tests.
   * upload-file-notification
     * Run the project.

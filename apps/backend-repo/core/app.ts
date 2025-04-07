import express, { Request, Response } from 'express';
import userRoutes from '../routes/userRoutes';
import cors from "cors";

const app = express();

/**
 * Configure CORS (Cross-Origin Resource Sharing)
 * 
 * This middleware allows requests from specific origins to access the API.
 * - `origin`: Specifies the allowed origin (replace with your frontend's URL in production).
 * - `methods`: Specifies the allowed HTTP methods (GET, POST, PUT, DELETE, etc.).
 * - `credentials`: Allows cookies and other credentials to be sent with requests.
 * 
 * Note: Ensure that the `origin` is updated to match the production frontend URL
 * to prevent unauthorized access.
 */
app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

/**
 * Middleware to Parse JSON
 * 
 * This middleware parses incoming requests with JSON payloads and makes the data
 * available in `req.body`. It is essential for handling API requests with JSON data.
 */
app.use(express.json());

/**
 * Mount User Routes
 * 
 * All routes defined in `userRoutes` will be prefixed with `/api`. This modular approach
 * keeps the application organized by separating route definitions into their own files.
 */
app.use('/api', userRoutes);

/**
 * Define the Port
 * 
 * The application will listen on the port specified in the `PORT` environment variable.
 * If no port is specified, it defaults to `3000`.
 */
const port = process.env.PORT || 3000;

/**
 * Root Route
 * 
 * This route serves as a health check or informational endpoint for the API.
 * It responds with a simple message indicating the API version.
 */
app.get('/', (req: Request, res: Response) => {
  res.send('This is eBuddy BackEnd API version 1.0');
});

/**
 * Start the Server
 * 
 * The application starts listening on the specified port. A message is logged to the console
 * to indicate that the server is running and accessible.
 */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
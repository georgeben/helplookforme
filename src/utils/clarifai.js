/**
 * Creates a Clarifai client used for Face detection
 */
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: process.env.VUE_APP_CLARIFY_API_KEY,
});

export default app;
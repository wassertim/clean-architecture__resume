import express from 'express';
import path from 'path';
import { ResumeRepository } from './infrastructure/repositories/ResumeRepository';
import { HTMLGenerator } from './infrastructure/services/HTMLGenerator';
import { PDFGenerator } from './infrastructure/services/PDFGenerator';
import { GetResumeHTML } from './application/usecases/GetResumeHTML';
import { GetResumePDF } from './application/usecases/GetResumePDF';
import { ResumeController } from './infrastructure/web/controllers/ResumeController';
import { IResumeService } from './application/interfaces/IResumeService';

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize repositories and services
const resumeRepository = new ResumeRepository();
const htmlGenerator = new HTMLGenerator(path.join(__dirname, 'templates', 'resume.hbs'));
const pdfGenerator = new PDFGenerator();

// Initialize use cases
const getResumeHTML = new GetResumeHTML(resumeRepository, htmlGenerator);
const getResumePDF = new GetResumePDF(resumeRepository, htmlGenerator, pdfGenerator);

// Create a service that implements IResumeService
const resumeService: IResumeService = {
  getResumeHTML: getResumeHTML.execute.bind(getResumeHTML),
  getResumePDF: getResumePDF.execute.bind(getResumePDF),
};

// Initialize controller
const resumeController = new ResumeController(resumeService);

// Set up routes
app.get('/users/:userId/:language', (req, res) => resumeController.getWebView(req, res));
app.get('/users/:userId/:language/pdf', (req, res) => resumeController.getPDF(req, res));

app.listen(port, () => {
  console.log(`Resume app listening at http://localhost:${port}`);
});
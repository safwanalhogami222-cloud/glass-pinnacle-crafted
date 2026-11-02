# Service URL repair
- [x] Replace placeholder redirect with genuine 404 and regression tests.
- [x] Audit rendered internal links and verify three service pages return 200 with matching content (45 pages, no broken links).
- [x] Apply required package security update and verify build (build OK; five regression tests pass).
- [x] Provide final pre-publish report and directly test rowadglass.com (three correct 200 service pages; placeholder ends in 404, no unrelated redirect).
- [ ] Publish tested version to rowadglass.com only: authorized, but blocked because www.rowadglass.com is not connected to this project and its public CNAME points to Vercel. Requires deployment through the existing host or an explicit domain connection.
- [ ] Verify three service pages after actual publication: waiting on the domain deployment blocker; current production responses can be checked without claiming publication.
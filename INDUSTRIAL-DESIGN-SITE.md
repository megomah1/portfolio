# industrial-design-site.tar.gz — what this is

The complete, build-verified scaffold for Megan's separate physical
development portfolio (the `megomah1/industrial-design` repo). It was built
in a session that could not push to that repo (session repo scope), so the
scaffold is parked here as a tarball for transfer.

**To deploy it** (for a future Claude session with access to
`megomah1/industrial-design`, or anyone with a terminal):

```bash
git clone <industrial-design repo>
tar -xzf industrial-design-site.tar.gz -C industrial-design/
cd industrial-design
npm install && npm run build   # verify
git add -A && git commit -m "Add portfolio site scaffold" && git push
```

Then import the repo as a new Vercel project (framework auto-detected, no
settings changes needed).

The site shares this repo's design system with a terracotta accent. Two
TODO URLs in its `lib/site.ts` need real values after Vercel import: its
own URL and the UX portfolio's URL.

Once the transfer is done, delete the tarball and this file from this repo.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Resolve service route params through `src/lib/service-routing.ts`; only existing concrete slugs are accepted, so invalid URLs reach the route's not-found boundary.
- Use TanStack `Link` with `to="/services/$slug"` and an explicit `params.slug` for service navigation; the template is a route ID, never a literal href.

import { signOut } from "@/app/hiring/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="btn btn-secondary min-h-10 px-4 py-2 text-sm"
      >
        Sign out
      </button>
    </form>
  );
}

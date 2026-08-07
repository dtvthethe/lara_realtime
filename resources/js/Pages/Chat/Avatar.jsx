export default function Avatar({ user, large = false }) {
    return (
        <span className={`relative flex shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${user.color} ${large ? 'size-11' : 'size-10'}`}>
            {user.initials}
            {user.online && <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-pink-400" />}
        </span>
    );
}

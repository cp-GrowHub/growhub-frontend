function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari yang lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit yang lalu`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} detik yang lalu`;
  }
  return 'baru saja';
}

function sortTodos(todos) {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.highPriority && !b.highPriority) return -1;
    if (!a.highPriority && b.highPriority) return 1;
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return 0;
  });

  return sortedTodos;
}

function getUpcomingGoals(goals) {
  const upcomingGoals = [...goals]
    .filter(
      (goal) =>
        (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24) > 0
    )
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return upcomingGoals;
}

function sortGoalsByDeadline(goals) {
  const sortedGoals = [...goals].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
  return sortedGoals;
}

function getTime() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  let timeStatus;

  if (hours < 12) {
    timeStatus = 'Morning';
  } else if (hours < 18) {
    timeStatus = 'Afternoon';
  } else {
    timeStatus = 'Night';
  }

  return {
    date: `${day} ${month} ${year}`,
    timeStatus,
  };
}

export { postedAt, sortTodos, getUpcomingGoals, sortGoalsByDeadline, getTime };

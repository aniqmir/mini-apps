import { Activity } from "../types/Activity";

type Props = {
  activity: Activity;
};

const ActivityCard: React.FC<Props> = ({ activity }) => {
  return (
    <div className="border rounded-xl p-4 shadow bg-white">
      <h3 className="text-lg font-semibold">{activity.name}</h3>
      <p className="text-gray-700 mt-2">{activity.description}</p>

      <div className="mt-3 text-sm">
        <p><strong>Items:</strong> {activity.items.join(", ") || "None"}</p>
        <p><strong>Skills:</strong> {activity.skills.join(", ")}</p>
        <p><strong>Setup:</strong> {activity.setup}</p>
        <p><strong>Time:</strong> {activity.time} min</p>
      </div>
    </div>
  );
};

export default ActivityCard;

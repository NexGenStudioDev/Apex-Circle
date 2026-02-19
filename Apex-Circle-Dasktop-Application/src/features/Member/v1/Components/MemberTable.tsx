import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCertificate } from "react-icons/fa";
import RoleChip from "./RoleChip";
import StatusChip from "./StatusChip";

type MemberTableProps = {
  members: Array<{
    name: string;
    image?: string;
    role: string;
    status: string;
    skills: string;
    certificates: string;
  }>;
};

const MemberTable = ({ members }: MemberTableProps) => {
  return (
    <div className="w-[90%] mt-6 rounded-2xl overflow-hidden border border-gray-200">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-600">
            <th className="px-6 py-4">Member Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Skills</th>
            <th className="px-6 py-4">Certificates</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-xl mr-3 inline-block"
                  />
                )}
                {member.name}
              </td>

              <td className="px-6 py-4">
                <RoleChip role={member.role} />
              </td>

              <td className="px-6 py-4">
                <StatusChip status={member.status} />
              </td>

              <td className="px-6 py-4 text-gray-600">{member.skills}</td>

              <td className="px-6 py-4 text-gray-600">
                <FaCertificate className="inline mr-2" /> {member.certificates}
              </td>

              <td className="px-6 py-4">
                <button className="px-4 py-2 text-sm rounded-lg  text-gray-600 hover:bg-gray-100   transition">
                  <BsThreeDotsVertical />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;

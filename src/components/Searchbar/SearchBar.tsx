import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Input
                placeholder="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                allowClear
                style={{ width: 350 }}
                prefix={<SearchOutlined style={{ color: "rgba(0,0,0,0.45)" }} />}
            />
        </div>
    );
};

export default SearchBar;

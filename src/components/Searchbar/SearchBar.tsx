import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Input
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        allowClear
        style={{ width: 300 }}
      />
      <Button icon={<SearchOutlined />} onClick={onSearch}>
      </Button>
    </div>
  );
};

export default SearchBar;

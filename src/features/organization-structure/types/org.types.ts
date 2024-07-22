export type OrgStructuresApi = {
  id: string;
  id_cabang: string;
  id_upline: string;
  id_rank: string;
  id_ktp: string;
  id_domisili: string;
  noreg: string;
  notim: string;
  telp: string;
  email: string;
  photo: string;
  status: string;
  domisili: string;
  attr_rank_nama: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: string;
  created_by: string;
  updated_by: string;
  children: OrgChildrenApi[];
};

export type OrgChildrenApi = {
  id: string;
  id_cabang: string;
  id_upline: string;
  id_rank: string;
  id_ktp: string;
  id_domisili: string | string;
  noreg: string;
  notim: string;
  telp: string | string;
  email: string;
  photo: string | string;
  status: string;
  domisili: string | string;
  attr_rank_nama: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: string;
  created_by: string;
  updated_by: string;
  children: OrgChildrenApi[];
};

// =======================================

export type OrgStructure = {
  title: string;
  titleClass?: string;
  member: OrgStructureMember[];
  children: OrgStructureChild[];
};

export type OrgStructureChild = {
  title: string;
  member?: AddMember[];
  children?: ChildChild[];
};

export type ChildChild = {
  title: string;
  titleClass?: string;
  contentClass?: string;
  member?: MemberAddMember[];
};

export type MemberAddMember = {
  name: string;
  add: string;
};

export type AddMember = {
  name: string;
  add: string;
  image_url?: string;
};

export type OrgStructureMember = {
  name: string;
  image_url: string;
};

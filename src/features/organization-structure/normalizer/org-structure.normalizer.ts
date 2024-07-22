import { OrgStructure, OrgStructuresApi } from '../types/org.types';

const orgNormalizer = (data: OrgStructuresApi[]): OrgStructure => {
  const result: OrgStructure = {
    title: 'MARKETING DIRECTOR',
    member: [
      {
        name: data[0]?.attr_rank_nama,
        image_url: ''
      }
    ],
    children: data[0]?.children.map(bm => ({
      title: 'BRANCH MANAGER',
      member: [
        {
          name: bm.attr_rank_nama,
          image_url: '',
          add: bm.id
        }
      ],
      children: bm.children.map(bc => ({
        title: 'BRANCH COORDINATOR',
        member: [
          {
            name: bc.attr_rank_nama,
            add: bc.id
          }
        ],
        children: bc.children.length
          ? bc.children?.map(es => ({
              title: 'EXECUTIVE SALES',
              member: [
                {
                  name: es.attr_rank_nama,
                  add: es.id
                }
              ]
            }))
          : undefined,
        extend: bc.children.length
      }))
    }))
  };
  console.log(result);
  return result;
};

export default orgNormalizer;

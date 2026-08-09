import React, { useEffect, useId, useRef, useState } from 'react';
import { Building, ChevronDown, HelpCircle, LogOut, Sun, User, Users } from 'lucide-react';
import { IconButton } from './IconButton';
import './HeaderNavigation.css';

export interface Account { id:string; name:string }
export interface Team { id:string; name:string }

export interface HeaderNavigationProps {
  accounts?:Account[]; selectedAccountId?:string; onAccountChange?:(accountId:string)=>void;
  teams?:Team[]; selectedTeamId?:string; onTeamChange?:(teamId:string)=>void;
  userName?:string; userEmail?:string; onHelpClick?:()=>void; onUserMenuClick?:()=>void;
  onAccountDetails?:()=>void; onThemeSwitch?:()=>void; onLogOut?:()=>void;
  className?:string; variant?:'fixed'|'static'; brandName?:string; themeActionLabel?:string;
}

type MenuName='account'|'team'|'user';

export function HeaderNavigation({
  accounts=[{id:'console-vms',name:'Console VMS'}], selectedAccountId='console-vms', onAccountChange,
  teams=[{id:'content-team',name:'Content Team'}], selectedTeamId='content-team', onTeamChange,
  userName='Jane Doe', userEmail='jane.doe@doe.com', onHelpClick, onUserMenuClick,
  onAccountDetails, onThemeSwitch, onLogOut, className='', variant='fixed', brandName='Rail Manager', themeActionLabel='Switch theme'
}:HeaderNavigationProps){
  const [openMenu,setOpenMenu]=useState<MenuName|null>(null);
  const rootRef=useRef<HTMLElement|null>(null);
  const menuRefs=useRef<Record<MenuName,HTMLDivElement|null>>({account:null,team:null,user:null});
  const instanceId=useId().replace(/:/g,'');
  const account=accounts.find(item=>item.id===selectedAccountId)??accounts[0];
  const team=teams.find(item=>item.id===selectedTeamId)??teams[0];
  const initials=userName.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase()||'U';

  useEffect(()=>{
    const close=(event:PointerEvent)=>{if(rootRef.current&&!rootRef.current.contains(event.target as Node))setOpenMenu(null)};
    document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);
  },[]);
  useEffect(()=>{if(openMenu)menuRefs.current[openMenu]?.querySelector<HTMLElement>('[role^="menuitem"]')?.focus()},[openMenu]);

  const toggle=(menu:MenuName)=>{setOpenMenu(current=>current===menu?null:menu);if(menu==='user')onUserMenuClick?.()};
  const closeAnd=(action?:()=>void)=>{setOpenMenu(null);action?.()};
  const menuKeys=(event:React.KeyboardEvent<HTMLDivElement>,menu:MenuName)=>{
    const items=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([disabled])'));
    const index=items.indexOf(document.activeElement as HTMLElement);
    if(event.key==='Escape'){event.preventDefault();setOpenMenu(null);document.getElementById(`${instanceId}-${menu}-trigger`)?.focus()}
    else if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();const step=event.key==='ArrowDown'?1:-1;items[(index+step+items.length)%items.length]?.focus()}
    else if(event.key==='Home'||event.key==='End'){event.preventDefault();items[event.key==='Home'?0:items.length-1]?.focus()}
  };

  const selector=(menu:MenuName,label:string,Icon:typeof Building,items:Array<Account|Team>,selectedId:string|undefined,onSelect?:((id:string)=>void))=><div className="cvp-header__dropdown">
    <button id={`${instanceId}-${menu}-trigger`} type="button" className="cvp-header__selector" aria-label={`Select ${menu}`} aria-haspopup="menu" aria-controls={openMenu===menu?`${instanceId}-${menu}-menu`:undefined} aria-expanded={openMenu===menu} onClick={()=>toggle(menu)} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();setOpenMenu(menu)}}}><Icon aria-hidden="true"/><span>{label}</span><ChevronDown className="cvp-header__chevron" aria-hidden="true"/></button>
    {openMenu===menu&&<div ref={node=>{menuRefs.current[menu]=node}} id={`${instanceId}-${menu}-menu`} className="cvp-header__menu" role="menu" aria-label={`${menu} options`} onKeyDown={event=>menuKeys(event,menu)}>{items.map(item=><button key={item.id} type="button" role="menuitemradio" aria-checked={item.id===selectedId} className="cvp-header__menu-item" onClick={()=>closeAnd(()=>onSelect?.(item.id))}>{item.name}</button>)}</div>}
  </div>;

  return <header ref={rootRef} className={`cvp-header cvp-header--${variant} ${className}`.trim()}>
    <div className="cvp-header__left"><a className="cvp-header__brand" href="#" aria-label={`${brandName} home`}><svg viewBox="0 0 32 32" role="img" aria-hidden="true"><path d="M4 16a12 12 0 0 1 24 0M7 20a9 9 0 0 1 18 0"/><text x="16" y="26" textAnchor="middle">CVP</text></svg><span>{brandName}</span></a><span className="cvp-header__divider" aria-hidden="true"/>{account&&selector('account',account.name,Building,accounts,selectedAccountId,onAccountChange)}</div>
    <div className="cvp-header__right"><IconButton size="medium" variant="ghost" aria-label="Help" onClick={onHelpClick}><HelpCircle/></IconButton><span className="cvp-header__divider" aria-hidden="true"/><div className="cvp-header__profile">{team&&selector('team',team.name,Users,teams,selectedTeamId,onTeamChange)}<div className="cvp-header__dropdown cvp-header__dropdown--user"><button id={`${instanceId}-user-trigger`} type="button" className="cvp-header__user" aria-label={`Open user menu for ${userName}`} aria-haspopup="menu" aria-controls={openMenu==='user'?`${instanceId}-user-menu`:undefined} aria-expanded={openMenu==='user'} onClick={()=>toggle('user')}><span aria-hidden="true">{initials}</span></button>{openMenu==='user'&&<div ref={node=>{menuRefs.current.user=node}} id={`${instanceId}-user-menu`} className="cvp-header__menu cvp-header__menu--user" role="menu" aria-label="User actions" onKeyDown={event=>menuKeys(event,'user')}><div className="cvp-header__identity"><strong>{userName}</strong><span>{userEmail}</span></div><button type="button" role="menuitem" className="cvp-header__menu-item cvp-header__menu-item--icon" onClick={()=>closeAnd(onAccountDetails)}><User aria-hidden="true"/>Account details</button><button type="button" role="menuitem" className="cvp-header__menu-item cvp-header__menu-item--icon" onClick={()=>closeAnd(onThemeSwitch)}><Sun aria-hidden="true"/>{themeActionLabel}</button><span className="cvp-header__menu-divider" role="separator"/><button type="button" role="menuitem" className="cvp-header__menu-item cvp-header__menu-item--icon cvp-header__menu-item--danger" onClick={()=>closeAnd(onLogOut)}><LogOut aria-hidden="true"/>Log out</button></div>}</div></div></div>
  </header>;
}

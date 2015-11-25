# -*- coding: utf-8 -*-
try:
    from cms.cms_toolbars import ADMIN_MENU_IDENTIFIER, ADMINISTRATION_BREAK
except ImportError:
    # CMS < 3.2 import has different location
    from cms.cms_toolbar import ADMIN_MENU_IDENTIFIER, ADMINISTRATION_BREAK
from cms.toolbar.items import Break
from django.core.urlresolvers import reverse, NoReverseMatch
from django.utils.translation import ugettext_lazy as _

from cms.toolbar_pool import toolbar_pool
from cms.toolbar_base import CMSToolbar


@toolbar_pool.register
class StyleguideToolbar(CMSToolbar):
    def populate(self):
        try:
            url = reverse('divio_styleguide_home')
        except NoReverseMatch:
            # the styleguide has not been added (apphook or urls.py)
            pass
        else:
            admin_menu = self.toolbar.get_or_create_menu(ADMIN_MENU_IDENTIFIER, _('Site'))
            position = admin_menu.find_first(Break, identifier=ADMINISTRATION_BREAK)
            link = admin_menu.add_link_item(_('Styleguide'), url=url, position=position)
            admin_menu.add_break('styleguide-break', position=link)